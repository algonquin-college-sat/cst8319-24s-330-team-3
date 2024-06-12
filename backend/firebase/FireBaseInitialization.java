package com.example.demo.firebase;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;

import org.springframework.stereotype.Service;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;

import jakarta.annotation.PostConstruct;

@Service
public class FireBaseInitialization {

	@PostConstruct
	public void Initialization() throws IOException {
		
	    		FileInputStream serviceAccount;
				try {
					serviceAccount = new FileInputStream("./fir-db-for-spring-boot-3ed93-firebase-adminsdk-dnz9b-4a87acf035.json");
			

				FirebaseOptions options = new FirebaseOptions.Builder()
				  .setCredentials(GoogleCredentials.fromStream(serviceAccount))
				  .setDatabaseUrl("https://fir-db-for-spring-boot-3ed93-default-rtdb.firebaseio.com")
				  .build();
	   FirebaseApp.initializeApp(options);
	   
				} catch (FileNotFoundException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
	    }
	}

