# Zoo
```
         (__)          (__)
         (oo)          (oo)
  /-------\/             \/-------\
 / |     ||               ||     | \
*  ||----||               ||----||  &
   ^^    ^^               ^^    ^^
```


# 🚀 Install and Uninstall

## Running
To install the application, cd into the project's directory then run the following commands:

```bash
minikube start --mount-string="$(pwd):/mount" --mount # need to mount for hot reload
kubectl apply -f k8s/ # add yml to cluster
eval $(minikube docker-env) # setup minikube docker images
docker build . -t zoo
helm install prometheus prometheus-community/prometheus -f values/prometheus-values.yaml
minikube service zoo
```

> **Note:** 
> 
> If you want to connect via the ingress, you must run `minikube addons enable ingress`, but this is not required
> We can just connect to the service directly since it's a local cluster

### If you can't find the promtheus chart
```bash
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update
```

## Deleting
To uninstall the application, run the following command:

```bash
minikube delete
```

# 🔑 Log into the Database
Before logging into the database, make sure the application is up and running. To check the status of the pods, run the following command:
```bash
kubectl get pods -l app=mysql
```

Copy the name of the pod and run the following command to log into the database:
```bash
kubectl exec -it <<POD NAME YOU COPIED, e.g. `mysql-756d44657b-q9btd`>> -- mysql zoo --user root --password 
```

You'll be prompted for a password. Enter `tea`. (This might change in the future.)











_______________________
## Danger zone

POD_NAME=$(kubectl get pods --namespace default -l "app.kubernetes.io/name=prometheus,app.kubernetes.io/instance=prometheus" -o jsonpath="{.items[0].metadata.name}")
  kubectl --namespace default port-forward $POD_NAME 9090 &
