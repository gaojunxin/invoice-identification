import requests
import json
import os
import openpyxl


lst = []
workbook = openpyxl.load_workbook("行程信息.xlsx")
sheet = workbook.active


data = []
for row in sheet.iter_rows(min_row=2, values_only=True):

    city = row[8]
    trip_date = row[11].replace("-", "")
    invoiceNumber = row[1]
    invoiceCode = row[0]
    amount = row[5]
    tax = row[6]
    note = row[9]+'到'+row[10]

    item = {
              "发票类型": "2040",
              "日期": trip_date,
              "地点": city,
              "金额": str(amount),
              "发票号码": invoiceNumber,
              "发票代码": invoiceCode,
              "税率编号": "01",
              "备注": note,
            }
    data.append(item)
  

with open('data.json', "w") as fp:
    json.dump(data, fp, ensure_ascii=False)


