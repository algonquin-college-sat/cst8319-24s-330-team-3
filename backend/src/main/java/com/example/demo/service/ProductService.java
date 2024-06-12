package com.example.demo.service;

import java.util.concurrent.ExecutionException;

import org.springframework.stereotype.Service;

import com.example.demo.entity.Product;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.WriteResult;
import com.google.firebase.cloud.FirestoreClient;

@Service
public class ProductService {
	
	//Collection(Table) name 
	private static final String COLLECTION_NAME = "products";

	//C
	public String saveProduct(Product product) throws InterruptedException, ExecutionException {
		
		Firestore dbFirestore = FirestoreClient.getFirestore();
		
		ApiFuture<WriteResult> collectionApiFuture = dbFirestore.collection(COLLECTION_NAME).document(product.getName()).set(product);
				
		return collectionApiFuture.get().getUpdateTime().toString();
		
	}
	//R
	public Product getProductDetails(String name) throws InterruptedException, ExecutionException {
		
		Firestore dbFirestore = FirestoreClient.getFirestore();
		
		DocumentReference documentReference = dbFirestore.collection(COLLECTION_NAME).document(name);
		
		ApiFuture<DocumentSnapshot> future = documentReference.get();
		DocumentSnapshot document = future.get();
		
		Product product = null;
		
		if(document.exists()) {
			product = document.toObject(Product.class);
			return product;
		} else {
			return null;
		}
		
	}
	//U
	public String updateProduct(Product product) throws InterruptedException, ExecutionException {
		
		Firestore dbFirestore = FirestoreClient.getFirestore();
		
		ApiFuture<WriteResult> collectionApiFuture = dbFirestore.collection(COLLECTION_NAME).document(product.getName()).set(product);
				
		return collectionApiFuture.get().getUpdateTime().toString();
		
	}
	//D
	public String deleteProduct(String name) throws InterruptedException, ExecutionException {
		
		Firestore dbFirestore = FirestoreClient.getFirestore();
		
		ApiFuture<WriteResult> collectionApiFuture = dbFirestore.collection(COLLECTION_NAME).document(name).delete();
				
		return "Product " + name + " has been deleted";
		
	}
}
