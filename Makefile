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
	@if grep -Eq '^APP_KEY=[^[:space:]]' backend/.env; then \
		echo "APP_KEY ya definida en backend/.env, no se regenera"; \
	else \
		cd backend && node ace generate:key; \
	fi
	cd backend && node ace migration:run

# Los servidores corren en su propio process group (perl setpgrp: 'set -m' no
# aísla nada en dash sin tty), así 'kill 0' solo alcanza a backend y frontend,
# nunca a quien lanzó make. Si uno de los dos termina, se para el grupo entero
# y make sale con error; ante Ctrl+C/TERM, este shell para el grupo.
# Se usa SIGINT (lo mismo que Ctrl+C sobre 'npm run dev'): 'ace serve' atrapa
# SIGTERM, mata su servidor hijo y se queda vivo. stdin a /dev/null para que
# un proceso en segundo plano no se quede parado (SIGTTIN) al leer del tty.
start: check-node ## Levanta backend y frontend a la vez (Ctrl+C para parar ambos)
	@command -v perl >/dev/null 2>&1 || { echo "Error: 'make start' necesita perl." >&2; exit 1; }
	@for f in backend/.env backend/node_modules frontend/node_modules; do \
		[ -e "$$f" ] || { echo "Error: falta $$f, ejecuta 'make setup' primero." >&2; exit 1; }; \
	done
	@trap 'trap "" INT TERM; kill -INT -$$pg 2>/dev/null; wait $$pg; exit 130' INT TERM; \
	perl -e 'setpgrp(0, 0); exec @ARGV or die "exec: $$!"' sh -c ' \
		(cd backend && npm run dev; echo "backend terminado, parando el resto..." >&2; kill -INT 0) & \
		(cd frontend && npm run dev; echo "frontend terminado, parando el resto..." >&2; kill -INT 0) & \
		wait; exit 1' </dev/null & pg=$$!; \
	wait $$pg
