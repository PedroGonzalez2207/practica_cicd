# README - Guía de comandos (Docker, Kubernetes y GitHub Actions)

# Objetivo

Este documento resume los comandos utilizados durante la práctica y los
comandos fundamentales para Docker, Kubernetes, Git, GitHub Actions y
despliegues.

------------------------------------------------------------------------

# 1. Node.js / NPM

  -----------------------------------------------------------------------
  Comando                             Descripción
  ----------------------------------- -----------------------------------
  `npm init -y`                       Inicializa un proyecto Node.js.

  `npm install`                       Instala dependencias y genera
                                      `package-lock.json`.

  `npm ci`                            Instala dependencias exactamente
                                      desde `package-lock.json`.

  `npm start`                         Ejecuta la aplicación.

  `npm test`                          Ejecuta las pruebas.
  -----------------------------------------------------------------------

------------------------------------------------------------------------

# 2. Docker

## Construcción

``` bash
docker build -t practica-cicd:v1 .
docker images
```

## Contenedores

``` bash
docker run -d --name practica-web -p 8080:8080 practica-cicd:v2
docker ps
docker stop practica-web
docker rm practica-web
docker rm -f practica-web
```

## Diagnóstico

``` bash
docker logs practica-web
docker logs -f practica-web
docker exec -it practica-web sh
docker inspect practica-web
docker port practica-web
```

------------------------------------------------------------------------

# 3. Git

``` bash
git init
git status
git add .
git commit -m "mensaje"
git log --oneline
git diff
git show HEAD
git branch
git branch -M main
git remote -v
git remote add origin URL
git push
git pull
```

------------------------------------------------------------------------

# 4. Kubernetes

## Cluster

``` bash
kubectl cluster-info
kubectl get nodes
```

## Aplicar manifiestos

``` bash
kubectl apply -f archivo.yaml
kubectl apply --dry-run=client -f archivo.yaml
```

## Recursos

``` bash
kubectl get pods
kubectl get deploy
kubectl get svc
kubectl get endpoints
kubectl get endpointslices
kubectl get pods -o wide
kubectl get pods --show-labels
```

## Descripción

``` bash
kubectl describe pod POD
kubectl describe deployment web-deployment
kubectl describe service web-service
```

## Logs y acceso

``` bash
kubectl logs POD
kubectl logs deployment/web-deployment
kubectl exec -it POD -- sh
kubectl port-forward service/web-service 8081:80
```

## Escalado

``` bash
kubectl scale deployment web-deployment --replicas=6
```

## Rollout (fundamental)

``` bash
kubectl rollout status deployment/web-deployment
kubectl rollout history deployment/web-deployment
kubectl rollout undo deployment/web-deployment
kubectl rollout restart deployment/web-deployment
```

**¿Qué hace cada uno?**

-   `status`: muestra el progreso del despliegue.
-   `history`: muestra revisiones.
-   `undo`: revierte a la versión anterior.
-   `restart`: reinicia los pods sin cambiar la imagen.

## Observación en tiempo real

``` bash
kubectl get pods -w
```

------------------------------------------------------------------------

# 5. Rolling Update

Ejemplo:

``` yaml
strategy:
  type: RollingUpdate
  rollingUpdate:
    maxUnavailable: 0
    maxSurge: 2
```

Conceptos:

-   `maxUnavailable`: pods fuera de servicio permitidos.
-   `maxSurge`: pods adicionales temporales.
-   `readinessProbe`: un pod recibe tráfico solo cuando está listo.
-   `livenessProbe`: reinicia un pod que dejó de responder.

------------------------------------------------------------------------

# 6. HPA (Horizontal Pod Autoscaler)

Crear:

``` bash
kubectl autoscale deployment web-deployment --cpu-percent=70 --min=2 --max=10
```

Consultar:

``` bash
kubectl get hpa
kubectl describe hpa
```

Eliminar:

``` bash
kubectl delete hpa web-deployment
```

------------------------------------------------------------------------

# 7. Minikube

``` bash
minikube start
minikube stop
minikube status
minikube image load practica-cicd:v4
minikube service web-service
```

------------------------------------------------------------------------

# 8. GitHub Actions

Conceptos importantes:

-   `uses`: utiliza una acción.
-   `run`: ejecuta comandos.
-   `needs`: crea dependencia entre jobs.
-   `on`: evento que dispara el workflow.

Ejemplo:

``` yaml
deploy:
  needs: build-test
```

------------------------------------------------------------------------

# 9. Diagnóstico rápido

Docker

``` bash
docker ps
docker logs practica-web
docker exec -it practica-web sh
```

Kubernetes

``` bash
kubectl get pods
kubectl describe service web-service
kubectl get endpoints
kubectl logs deployment/web-deployment
```

Git

``` bash
git status
git log --oneline
git diff
```

------------------------------------------------------------------------

# 10. Flujo recomendado

1.  Desarrollar
2.  npm test
3.  docker build
4.  docker run
5.  kubectl apply
6.  kubectl rollout status
7.  Verificar Service y Endpoints
8.  git commit
9.  git push
10. Revisar GitHub Actions

------------------------------------------------------------------------

# Resumen

## Docker

-   build
-   run
-   logs
-   exec
-   inspect

## Kubernetes

-   apply
-   get
-   describe
-   logs
-   exec
-   scale
-   rollout
-   port-forward
-   autoscale

## Git

-   add
-   commit
-   push
-   pull
-   diff
-   log

## CI/CD

-   npm test
-   GitHub Actions
-   needs
-   Rolling Update
-   HPA
