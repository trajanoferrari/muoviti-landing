import zipfile
import os
import sys

def package_project(output_name):
    root_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    files_to_include = ['index.html', 'style.css', 'main.js']
    folders_to_include = ['assets']
    
    zip_path = os.path.join(os.path.dirname(root_dir), output_name)
    
    with zipfile.ZipFile(zip_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
        for file in files_to_include:
            file_path = os.path.join(root_dir, file)
            if os.path.exists(file_path):
                zipf.write(file_path, file)
        
        for folder in folders_to_include:
            folder_path = os.path.join(root_dir, folder)
            if os.path.exists(folder_path):
                for root, dirs, files in os.walk(folder_path):
                    for f in files:
                        abs_path = os.path.join(root, f)
                        rel_path = os.path.relpath(abs_path, root_dir)
                        zipf.write(abs_path, rel_path)
    
    print(f"Project successfully packaged to {zip_path}")

if __name__ == "__main__":
    name = sys.argv[1] if len(sys.argv) > 1 else "Muoviti_Master_Latest.zip"
    package_project(name)
