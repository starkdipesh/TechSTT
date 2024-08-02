from setuptools import setup,find_packages
setup(
    name='TechSTT',
    version='0.1',
    author='Dipesh Patel',
    author_email='dpatel8319821606@gmail.com',
    description='This is speech to text Package created by Dipesh Patel.'
)
packages=find_packages(),
install_requirements=[
    'selenium',
    'webdriver_manager'
]
