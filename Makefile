DOCKER_CONTAINER=matcha
DOCKER_IMAGE=matcha
DOCKER_VERSION=0.0.1

all:

clean:

fclean:

docker-build:
	sudo docker build -t $(DOCKER_IMAGE) .

docker-run:
	sudo docker run -d --name $(DOCKER_IMAGE) \
	-e MATCHA_MONGODB_USERNAME=matcha \
	-e MATCHA_MONGODB_PASSWORD=matcha \
    -e MATCHA_MONGODB_HOST=mongodb \
    -e MATCHA_MONGODB_DATABASE=matcha \
    -e MATCHA_MONGODB_PORT=27017 \
	-e PORT=5000 \
    -p 5000:5000 \
	-p 8080:8080 \
	$(DOCKER_IMAGE):$(DOCKER_VERSION)

docker-build-run: docker-tag docker-run

docker-tag: docker-build
	sudo docker tag $(DOCKER_IMAGE):latest \
	$(DOCKER_IMAGE):$(DOCKER_VERSION)

docker-hub-push: docker-build
	sudo docker login -u alvinmaquena
	sudo docker tag $(DOCKER_IMAGE):latest \
	alvinmaquena/$(DOCKER_IMAGE):$(DOCKER_VERSION)
	sudo docker push alvinmaquena/$(DOCKER_IMAGE):$(DOCKER_VERSION)

docker-fclean: docker-clean
	sudo docker rmi $(DOCKER_IMAGE):latest \
	$(DOCKER_IMAGE):$(DOCKER_VERSION)

docker-clean:
	sudo docker rm -f $(DOCKER_CONTAINER)