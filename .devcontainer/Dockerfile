FROM pool-controller:latest

# Install curl if not already available
RUN apt-get update && apt-get install -y curl gnupg

# Add NodeSource GPG key and repo for Node.js 18
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs