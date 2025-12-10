# Configure cpp executor, code-runner.executorMap / cpp

## w mappingach
"cpp": "mkdir -p build && clang++ -std=c++20 $fileName -o build/$fileNameWithoutExt.bin && ./build/$fileNameWithoutExt.bin",


## w root
"code-runner.fileDirectoryAsCwd": true,