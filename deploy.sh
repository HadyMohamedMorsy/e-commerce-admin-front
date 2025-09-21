SERVER="root@46.202.170.91"
TARGET_DIR="/var/www/azalove/admin"
LOCAL_DIR="./dist/ecommerce-app/browser"

echo "Starting deployment to $SERVER:$TARGET_DIR"

# Step 1: Clean the remote directory
echo "Cleaning remote directory..."
ssh $SERVER "rm -rf $TARGET_DIR/*"

# Step 2: Deploy new files
echo "Deploying new files..."
scp -r $LOCAL_DIR/* $SERVER:$TARGET_DIR/

echo "Deployment completed successfully!"
