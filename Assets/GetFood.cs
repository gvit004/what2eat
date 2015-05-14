using UnityEngine;
using UnityEngine.UI;
using UnityEngine.Events;
using System.Collections;
using System.Collections.Generic;

public class GetFood : MonoBehaviour {
	GameObject foodinput;
	public InputField foodinput2;
	Text foodinputtext;
	WWW www;
	string json, foodlist, url;
	Dictionary<string,string> headers = new Dictionary<string,string>();

	void Start(){
		foodinput = GameObject.Find("FoodInput");
		url = "http://128.199.163.188:32769/what2eat";

		headers.Add ("Content-Type", "application/json");
		foodinputtext = foodinput.GetComponentsInChildren<Text>()[1];
	}

	public void submitFoodText(){
		Debug.Log ("Food :" + foodinput.GetComponentsInChildren<Text>()[1].text);
		foodlist = foodinput.GetComponentsInChildren<Text>()[1].text;
		json = "{\"list\":\"" + foodlist + "\"}";

		var bytes = System.Text.Encoding.UTF8.GetBytes(json);
		www = new WWW (url, bytes, headers);
		WaitForRequest (www);
		foodinput2.text = "";
	}

	static IEnumerator WaitForRequest(WWW www){
		yield return www;
		if (www.error == null) {
			Debug.Log ("WWW Ok: " + www.text);	
		} else {
			Debug.Log ("WWW Error " + www.error);
		}		
		www.Dispose ();
	}

	void Update(){
	}
}
