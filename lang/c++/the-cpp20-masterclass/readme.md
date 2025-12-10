# Configure cpp executor, code-runner.executorMap / cpp

"cpp": "mkdir -p build && clang++ -std=c++20 $fileName -o build/$fileNameWithoutExt.bin && ./build/$fileNameWithoutExt.bin",