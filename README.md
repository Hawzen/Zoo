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
To install the application, run the following commands:

```bash
# be at root directory
minikube start
kubectl apply -f k8s/ # add yml to cluster
eval $(minikube docker-env) # setup minikube docker images
docker build . -t zoo
kubectl get pods # Confirm everything is running
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