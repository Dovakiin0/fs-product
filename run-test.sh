
#!/bin/bash

# Run Docker Compose for the "test" environment
docker compose -f docker-compose-test.yml up --build -d

# Wait for the tests to finish (adjust the sleep time as needed)
sleep 10

# Check if any tests failed
docker logs fs-product_test | grep "Test failed"

# Get the exit code of the test container
EXIT_CODE=$(docker wait fs-product_test)

# Shut down the Docker Compose environment
docker compose -f docker-compose-test.yml down

# Prune any dangling image
docker image prune -f

# Exit with an error code if any tests failed
if [ "$EXIT_CODE" -ne 0 ]; then
  echo "Some tests failed. Check the logs for details."
  exit 1
else
  echo "All tests passed."
  exit 0
fi
