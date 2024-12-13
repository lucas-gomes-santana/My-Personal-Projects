Simple Written Tutorial for Installing the JavaScript Framework Node.js
Note: The commands provided here should be entered into your computer's terminal in sequence (from top to bottom).
If there are any errors in this written tutorial, leave comments in the discussion section of this repository.

Installing Node.js on Windows
Download the installer:

Visit the official Node.js website: https://nodejs.org.
Download the recommended version (LTS) for greater stability.
Run the installer:

Double-click the downloaded file (.msi).
Follow the instructions in the installation wizard.
Make sure to select the option to install the npm package manager.
Verify the installation:

Open the Command Prompt (CMD) and run:
node -v
npm -v
This will display the installed versions of Node.js and npm.
Installing Node.js on Linux
The process of installing Node.js may vary slightly between different Linux distributions, as each uses a different package manager or specific configurations. Here is an overview for the main distributions:

Ubuntu, Linux Mint, and Debian
These distributions use the apt package manager.

Install using apt:
sudo apt update
sudo apt install nodejs npm
Note: This version may be outdated depending on the repository.
Fedora, CentOS, and RHEL
These distributions use the dnf or yum package manager.

Install using dnf (Fedora) or yum (CentOS/RHEL):
sudo dnf install nodejs npm
sudo yum install nodejs npm
Arch Linux and Manjaro
These distributions use the pacman package manager.

Install using pacman:
sudo pacman -S nodejs npm
OpenSUSE
OpenSUSE uses the zypper package manager.

Install using zypper:
sudo zypper install nodejs npm
Generic Linux Distributions (via NVM)
If your distribution is not directly supported, or you want greater flexibility, use the Node Version Manager (NVM). This method works on any Linux distribution.

Install NVM:
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
After installing, restart the terminal.

Install the LTS version of Node.js with NVM:
nvm install --lts
Installing Node.js on macOS
Download the installer:

Visit https://nodejs.org and download the recommended version (LTS).
Run the installer:

Open the downloaded .pkg file and follow the instructions.
Verify the installation:
node -v
npm -v
(Optional) Install via Homebrew:

If you use Homebrew, you can install Node.js with:

brew install node
