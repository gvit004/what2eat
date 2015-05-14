using UnityEngine;
using UnityEngine.UI;
using System.Collections;

public class TestWWW : MonoBehaviour {
	
	WWW www ;
	string url;
	public Text foodtext;
	// Use this for initialization
	void Start () {
		url = "http://128.199.163.188:32769/what2eat";
	}

	IEnumerator WaitForRequest(WWW www){
		yield return www;
		if (www.error == null) {
			Debug.Log ("WWW Ok: " + www.text);	
			foodtext.text = www.text;
		} else {
			Debug.Log ("WWW Error " + www.error);
			foodtext.text = www.text;
			foodtext.text = "ERROR";
			foodtext.color = Color.red;
		}		
		www.Dispose ();
	}

	public void makeRequest(){		
		www = new WWW (url);
		StartCoroutine (WaitForRequest (www));
	}
}
