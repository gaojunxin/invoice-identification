import time
import openpyxl
import pyautogui
from tkinter import *
 
def main():
    """调用tkinter，生成UI界面"""
    root = Tk()
 
    # 设置窗口前端显示
    root.wm_attributes('-topmost', 1)
    content = StringVar()
    e = Entry(root, textvariable=content, width=30, bd=5, font=("Times New Roman", 13))
    e.insert(0, "开始后请把光标放到要填充的位置!")
    e.pack()
 
    # 设置居中显示
    screenwidth = root.winfo_screenwidth()
    screenheight = root.winfo_screenheight()
    width = 320
    height = 170
    size = "%dx%d+%d+%d" % (width, height, (screenwidth - width) / 2, (screenheight - height) / 2)
    root.geometry(size)
 
    # 设置窗口标题及大小
    root.title('成绩录入')
    root['width'] = 310;
    root['height'] = 165
 
    # 设置按纽
    def b_showup():
        e.delete(0,END)
        e.insert(0,'开始填充,请勿移动鼠标键盘！')
        lst = read_lst()
        time.sleep(1)
        fit(lst)
 
    def b_quitprog():
        root.destroy()
 
    b_show = Button(root, text='一键填充', width=10, height=1, font=("微软雅黑", 11), command=b_showup)
    b_quit = Button(root, text="退出程序", width=10, height=1, font=("微软雅黑", 11), command=b_quitprog)
    b_show.pack()
    b_quit.pack()
    root.mainloop()
 
 
def read_lst():
    '''读取Excel表格，返回列表lst'''
    lst = []
    workbook = openpyxl.load_workbook("行程信息.xlsx")
    sheet = workbook.active
    for row in sheet.rows:
        lst.append((str(row[0].value), str(row[1].value), str(row[2].value), str(row[3].value), str(row[4].value), str(row[5].value)))  # 把每一行的两个数据存为一个元组，存入列表
    return lst
 
def fit(lst):
    '''把列表lst中的数据批量写在屏幕的指定位置'''
    lst = read_lst()
    pyautogui.typewrite('2040', 0.01)
    # 获取当前鼠标位置
    current_x, current_y = pyautogui.position()

    # 平移 100 像素
    new_x = current_x + 200
    new_y = current_y

    # 移动鼠标到新位置
    pyautogui.moveTo(new_x, new_y, duration=0.25)
    pyautogui.click()
    pyautogui.typewrite(k[8], 0.01)
    for k in lst:
        # pyautogui.typewrite(k[0], 0.01)
        # pyautogui.press("tab")
        # pyautogui.typewrite(k[1], 0.01)
        # pyautogui.press("tab")
        # pyautogui.typewrite('2040', 0.01)
        pass
        # pyautogui.moveTo(100, 0, duration=0.25) 
        # pyautogui.click()
        # pyautogui.typewrite(k[8], 0.01)


main()