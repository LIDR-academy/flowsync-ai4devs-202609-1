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
	@command -v node >/dev/null 2>&1 || { echo "Error: no se encuentra 'node' en el PATH." >&2; exit 1; }
	@command -v npm >/dev/null 2>&1 || { echo "Error: no se encuentra 'npm' en el PATH." >&2; exit 1; }
	@case "$$(command -v node)" in /mnt/*) \
		echo "Error: 'node' apunta a una instalación de Windows ($$(command -v node))." >&2; \
		echo "       Instala Node dentro de WSL (p. ej. con nvm)." >&2; exit 1;; \
	esac
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
	@[ -f backend/.env ] || { echo "Error: falta backend/.env, ejecuta 'make setup' primero." >&2; exit 1; }
	@trap 'kill 0' INT TERM; \
	(cd backend && npm run dev) & \
	(cd frontend && npm run dev) & \
	wait
