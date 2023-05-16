#include <iostream>
#include <filesystem>
namespace fs = std::filesystem;

int main()
{
    freopen("./resrcsPaths.json", "w", stdout);
    std::cout << "{";
    std::cout << "\"paths\":\n[";
    for (auto const& dir_entry : fs::recursive_directory_iterator("./resrcs")) {

        std::cout << dir_entry.path() << ',';
        std::cout << '\n';
    }
    std::cout << "\"./\"";
    std::cout << "]";
    std::cout << "}";
}