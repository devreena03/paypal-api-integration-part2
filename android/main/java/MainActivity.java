package demo.reena.com.btrt;

import android.app.Activity;
import android.preference.PreferenceActivity;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.Toast;

import com.braintreepayments.api.BraintreeFragment;
import com.braintreepayments.api.PayPal;
import com.braintreepayments.api.exceptions.InvalidArgumentException;
import com.braintreepayments.api.interfaces.PaymentMethodNonceCreatedListener;
import com.braintreepayments.api.models.PayPalAccountNonce;
import com.braintreepayments.api.models.PayPalRequest;
import com.braintreepayments.api.models.PaymentMethodNonce;
import com.braintreepayments.api.models.PostalAddress;
import com.loopj.android.http.AsyncHttpClient;
import com.loopj.android.http.AsyncHttpResponseHandler;
import com.loopj.android.http.HttpGet;
import com.loopj.android.http.RequestParams;
import com.loopj.android.http.TextHttpResponseHandler;

import org.json.JSONException;
import org.json.JSONObject;

import cz.msebera.android.httpclient.Header;

public class MainActivity extends AppCompatActivity implements PaymentMethodNonceCreatedListener {

    private String clientToken=null;
    private String nonce;
    private BraintreeFragment mBraintreeFragment;
    private static Activity mActivityRef = null;
    private static final String BASE_URL = "https://paypal-integration-sample.herokuapp.com";
    // private static final String BASE_URL = "https://iocor.serveo.net";
    private static final String CLIENT_TOKEN_URL = "/api/paypal/ecbt/client_token";
    private static final String VAULT = "/api/paypal/ecbt/vault";
    private static final String VAULT_WITH_PAYMENT = "/api/paypal/ecbt/vaultwithpayment";
    private static boolean isVaultWithPayment = false;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        mActivityRef = this;
    }

    public void vault(View v) {
        Log.e("enter  ", "vault");
        isVaultWithPayment = false;
        referenceTxn(v);
    }

    public void vaultWithPay(View v) {
        Log.e("enter  ", "vaultWithPay");
        isVaultWithPayment = true;
        referenceTxn(v);
    }

    public void referenceTxn(View v){
        try {
            AsyncHttpClient client = new AsyncHttpClient();
            client.get(BASE_URL + CLIENT_TOKEN_URL, new TextHttpResponseHandler() {

                @Override
                public void onFailure(int statusCode, Header[] headers, String responseString, Throwable throwable) {
                    Log.i("fail", responseString);
                }

                @Override
                public void onSuccess(int statusCode, Header[] headers, String response) {
                    Log.i("DONE clientToken",response);
                    clientToken = response;
                    try {
                        mBraintreeFragment = BraintreeFragment.newInstance(mActivityRef, clientToken);
                        PayPalRequest request = new PayPalRequest()
                                .localeCode("US")
                                .billingAgreementDescription("My Andriod testing agreement");
                        PayPal.requestBillingAgreement(mBraintreeFragment, request);

                    } catch (InvalidArgumentException e) {
                        Log.e("error  ",e.getMessage());
                    }
                }

            });
        } catch (Exception e) {
            Log.e("error  ",e.getMessage());
        }
    }

    @Override
    public void onPaymentMethodNonceCreated(PaymentMethodNonce paymentMethodNonce) {
        Log.e("enter  ","onPaymentMethodNonceCreated");
        // Send nonce to server
        String nonce = paymentMethodNonce.getNonce();
        postNonceToServer(nonce);
        Log.e("exit  ","onPaymentMethodNonceCreated");
    }

    private void postNonceToServer(String nonce) {
        Log.e("enter  ","postNonceToServer");
        AsyncHttpClient client = new AsyncHttpClient();
        RequestParams params = new RequestParams();
        params.put("nonce", nonce);
        String URL = isVaultWithPayment?(BASE_URL+VAULT_WITH_PAYMENT):(BASE_URL+VAULT);
        client.post(URL, params,
                new AsyncHttpResponseHandler() {
                    @Override
                    public void onSuccess(int statusCode, Header[] headers, byte[] responseBody) {
                        String body = new String(responseBody);
                        Log.d("payment  ",body);
                       // JSONParser parser = new JSONParser();
                        try {
                            JSONObject json = new JSONObject(body);
                        } catch (JSONException e) {
                            e.printStackTrace();
                        }
//                        Toast toast = Toast.makeText(getApplicationContext(),
//                                "Payment "+body,
//                                Toast.LENGTH_SHORT);
//
//                        toast.show();
                    }

                    @Override
                    public void onFailure(int statusCode, Header[] headers, byte[] responseBody, Throwable error) {
                        Log.e("checkout  ",error.getMessage());
                    }
                }
        );
        Log.e("exit  ","postNonceToServer");
    }
//


}
