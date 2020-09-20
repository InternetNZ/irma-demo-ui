
deploy:
	echo "Deploying to $$AWS_PROFILE" \
	&& aws s3 sync . s3://irma-demo-ui/ --exclude ".git*" --exclude "deploy.sh" --exclude ".idea/*"
