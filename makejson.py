import os, sys, json
import collections as cl

def main():
    name_list = ["ID", "Class", "Arousal", "Valence", "Drowsiness", "Concentration"]
# ここの代わりに引数を渡す
    ID = ["0","1","2","3","4"]
    Class = ["0","1","2","3","4"]
    Arousal = ["0","0.1","0.2","0.3","0.4"]
    Valence = ["0","-0.1","-0.2","-0.3","-0.4"]
    Drowsiness = ["2","2.1","2.2","2.3","2.4"]
    Concentration = ["0.3","0.4","0.5","0.6","0.7"]
#
    json_data = cl.OrderedDict()
    for i in range(len(ID)):
        data = cl.OrderedDict()
        data["ID"] = ID[i]
        data["Class"] = Class[i]
        data["Arousal"] = Arousal[i]
        data["Valence"] = Valence[i]
        data["Drowsiness"] = Drowsiness[i]
        data["Concentration"] = Concentration[i]
        json_data["ID%02d"%i] = data

    with open("json/data.json","w") as json_file:
        json.dump(json_data, json_file, indent=4)

if __name__=='__main__':
  main()
