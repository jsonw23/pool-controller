FROM pool-controller:latest

# Install curl if not already available
RUN apt-get update && apt-get install -y curl gnupg git

# Add NodeSource GPG key and repo for Node.js 18
RUN curl -fsSL https://deb.nodesource.com/setup_22.x | bash - \
    && apt-get install -y nodejs

# Install yarn
RUN npm install -g yarn