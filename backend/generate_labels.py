import json
import urllib.request

url = "https://storage.googleapis.com/download.tensorflow.org/data/imagenet_class_index.json"
json_file = "imagenet_class_index.json"

# Download the JSON file
urllib.request.urlretrieve(url, json_file)

# Convert JSON to a plain text file
with open(json_file, 'r') as f:
    class_data = json.load(f)

labels = [class_data[str(i)][1] for i in range(len(class_data))]
with open("imagenet_classes.txt", 'w') as f:
    f.write("\n".join(labels))

print("Labels saved to imagenet_classes.txt")
