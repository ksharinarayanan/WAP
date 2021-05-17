import os


class Colors:
    BLUE = ''
    GREEN = ''
    YELLOW = ''
    RED = ''
    RESET = ''
    BOLD = ''
    CYAN = ''

def disableColorsForWindows():
    if os.name == "nt":
        Colors.BLUE = Colors.GREEN = Colors.YELLOW = Colors.RED = Colors.RESET = Colors.BOLD = Colors.CYAN = ""
