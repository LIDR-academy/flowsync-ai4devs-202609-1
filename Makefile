# FlowSync — tareas de desarrollo local.
# Compatible con macOS (GNU Make 3.81 + /bin/sh), Linux y Windows vía WSL:
# solo sh POSIX, sin .ONESHELL ni extensiones de GNU Make >= 3.82.

SHELL := /bin/sh

NODE_MIN_MAJOR := 24

.DEFAULT_GOAL := help
.PHONY: help setup start check-node

help: ## Muestra esta ayuda
	@echo "Uso: make <target>"
	@echo ""
	@echo "  setup   Instala dependencias, prepara los .env, genera APP_KEY y corre migraciones"
	@echo "  start   Levanta backend (http://localhost:3333) y frontend (http://localhost:5173)"

check-node:
	@[ -d backend ] && [ -d frontend ] || { echo "Error: ejecuta make desde la raíz del repo (o usa 'make -C <raíz>')." >&2; exit 1; }
	@command -v node >/dev/null 2>&1 || { echo "Error: no se encuentra 'node' en el PATH." >&2; exit 1; }
	@command -v npm >/dev/null 2>&1 || { echo "Error: no se encuentra 'npm' en el PATH." >&2; exit 1; }
	@for bin in node npm; do \
		case "$$(command -v $$bin)" in /mnt/*) \
			echo "Error: '$$bin' apunta a una instalación de Windows ($$(command -v $$bin))." >&2; \
			echo "       Instala Node dentro de WSL (p. ej. con nvm)." >&2; exit 1;; \
		esac; \
	done
	@major=$$(node -p 'process.versions.node.split(".")[0]'); \
	if [ "$$major" -lt $(NODE_MIN_MAJOR) ]; then \
		echo "Error: se necesita Node >= $(NODE_MIN_MAJOR) (tienes $$(node --version))." >&2; \
		echo "       Con nvm: nvm install $(NODE_MIN_MAJOR) && nvm use $(NODE_MIN_MAJOR)" >&2; \
		exit 1; \
	fi

setup: check-node ## Deja el proyecto listo para arrancar (idempotente)
	cd backend && npm install
	cd frontend && npm install
	@[ -f backend/.env ] || { cp backend/.env.example backend/.env && echo "Creado backend/.env"; }
	@[ -f frontend/.env ] || { cp frontend/.env.example frontend/.env && echo "Creado frontend/.env"; }
	@if grep -Eq '^APP_KEY=.+' backend/.env; then \
		echo "APP_KEY ya definida en backend/.env, no se regenera"; \
	else \
		cd backend && node ace generate:key; \
	fi
	cd backend && node ace migration:run

start: check-node ## Levanta backend y frontend a la vez (Ctrl+C para parar ambos)
	@for f in backend/.env backend/node_modules frontend/node_modules; do \
		[ -e "$$f" ] || { echo "Error: falta $$f, ejecuta 'make setup' primero." >&2; exit 1; }; \
	done
# Ambos procesos comparten process group con este shell. Ante Ctrl+C/TERM, o
# si uno de los dos termina, se manda TERM a todo el grupo para no dejar el
# otro vivo ni huérfanos. El trap se desarma antes de 'kill 0' para que la
# señal que se reenvía al propio shell no vuelva a disparar el trap en bucle.
	@trap 'trap - INT TERM; kill 0' INT TERM; \
	(cd backend && npm run dev; echo "backend se ha detenido, parando frontend..." >&2; kill 0) & \
	(cd frontend && npm run dev; echo "frontend se ha detenido, parando backend..." >&2; kill 0) & \
	wait
