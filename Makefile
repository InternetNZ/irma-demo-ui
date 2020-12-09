help:           ## Show this help.
	@fgrep -h "##" $(MAKEFILE_LIST) | fgrep -v fgrep | sed -e 's/\\$$//' | sed -e 's/##//'

deploy:		## Deploy to s3 - be sure to set your aws profile
	echo "Deploying to $$AWS_PROFILE" \
	&& aws s3 sync ./src/ s3://irma-demo-ui/ \
	&& echo "Done!"
