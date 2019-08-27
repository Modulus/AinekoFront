# This is just demo config
kubectl change-ns demo
# Install postgres with helm
helm install -n dev-postgres --namespace demo -f values.yml stable/postgresql

kubectl apply -k .