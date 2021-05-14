<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Validator;
use Illuminate\Support\Facades\Auth;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Cookie;
use Image;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;
use App\Mail\ShopRegisterNotification;
use Mail;

class UsersController extends Controller
{


    public function test(){
        try{
            Mail::to("mahesh25242@gmail.com")->send(new ShopRegisterNotification(\App\Models\User::find(1), \App\Models\Shop::find(1)));
        }catch (\Swift_TransportException $e) {
          //  echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }
    public function createAdmin(Request $request)
    {


        $return  = null;
        // $recaptcha = new \ReCaptcha\ReCaptcha(env("RECAPTCHA_SECRET"));
        // $resp = $recaptcha->setExpectedAction("SignUp")
        //                 //->setExpectedHostname(env("APP_URL"))
        //                 ->verify($request->input('recaptcha'), $request->ip());
        // if (!$resp->isSuccess()) {
        //    return response($resp->getErrorCodes());
        // }

        $validationArr = [
            'fname' => ['required'],
            //'lname' => ['required'],
        ];

        if($request->input("id", 0)){
            $validationArr["email"] = ['required', 'email', 'unique:users,email,'.$request->input("id", 0)];
            $validationArr["phone"] = ['required', 'unique:users,phone,'.$request->input("id", 0)];
            if($request->input("password", null)){
                $validationArr["password"] = ['required', 'string','min:6',  'max:255', 'confirmed'];
                $validationArr["password_confirmation"] =  ['required', 'string',  'max:255'];
            }
        }else{
            $validationArr["email"] = ['required', 'email', 'unique:users,email'];
            $validationArr["phone"] = ['required', 'unique:users,phone'];
            $validationArr["password"] = ['required', 'string','min:6',  'max:255', 'confirmed'];
            $validationArr["password_confirmation"] =  ['required', 'string',  'max:255'];
        }
        $validator = Validator::make($request->all(), $validationArr,[],[
            'fname' => 'First name',
            'lname' => 'Last name',
            'password_confirmation' => "Confirm Password"
        ]);


        if($validator->fails()){
            return response(['message' => 'Validation errors', 'errors' =>  $validator->errors(), 'status' => false], 422);
        }

        $input = $request->all();
        if($request->input("id", 0)){
            if($input['password']){
                $input['password'] = Hash::make($input['password']);
            }
            $user = User::find($request->input("id", 0));
            $user->fname = $request->input("fname", '');
            $user->mname = $request->input("mname", '');
            $user->lname = $request->input("lname", '');
            $user->email = $request->input("email", '');
            $user->phone = $request->input("phone", '');
        }else{
            $input['password'] = Hash::make($input['password']);
            $user = \App\Models\User::create($input);
        }



        /**Take note of this: Your user authentication access token is generated here **/
        if(!$request->input("id", 0)){
            $data['token'] =  $user->createToken('cart')->accessToken;
        }

        $data['name'] =  $user->fname;



        $userRole = \App\Models\UserRole::updateOrCreate(
            [
                "shop_id" => $request->input("shop_id", 0),
                "role_id" => 2,
                "user_id" => $user->id
            ],
            [
                "shop_id" => $request->input("shop_id", 0),
                "role_id" => 2,
                "user_id" => $user->id
            ]
        );
        return response(['data' => $data, 'message' => 'Saved successfully!', 'status' => true]);
    }

    public function authUser(Request $request){
        $user = \App\Models\User::with(["country", "state",
         "city", "role", "lastLogin"])->find(Auth::id());
        return response($user);
    }

    public function signOut(Request $request){
        $request->user()->token()->revoke();

    // Revoke all of the token's refresh tokens
    // => Set public.oauth_refresh_tokens.revoked to TRUE (t)
        $refreshTokenRepository = app('Laravel\Passport\RefreshTokenRepository');
        $refreshTokenRepository->revokeRefreshTokensByAccessTokenId($request->user()->token()->id);



        return response([
            'message' => 'successfully logged!', 'status' => true
        ]);
    }

    public function setUserLogin(Request $request){

        $validator = Validator::make($request->all(), [
            'action' => ['required', 'string'],
        ]);


        if($validator->fails()){
            return response(['message' => 'Validation errors', 'errors' =>  $validator->errors(), 'status' => false], 422);
        }


        $userLogin = new \App\Models\UserLogin;
        $userLogin->user_id = Auth::id();
        $userLogin->name = $request->input("action");
        $userLogin->save();
        return response([
            'message' => 'successfully saved!', 'status' => true
        ]);
    }

    public function updateProfile(Request $request){


        $validationField = [
            'fname' => ['required'],
            'email' => ['required', 'email'],
        ];


        if($request->input("isChanegPassword", false)){
            $validationField["password"] = ['required', 'string','min:6',  'max:255', 'confirmed'];
            $validationField["password_confirmation"] = [ 'required', 'string',  'max:255'];
        }
        $validator = Validator::make($request->all(), $validationField,[],[
            'fname' => 'First name',
            'lname' => 'Last name',
            'password_confirmation' => "Confirm Password"
        ]);


        if($validator->fails()){
            return response(['message' => 'Validation errors', 'errors' =>  $validator->errors(), 'status' => false], 422);
        }


        $user = \App\Models\User::find(Auth::id());
        $user->fname = $request->input("fname", '');
        $user->lname = $request->input("lname",'');
        $user->email = $request->input("email",'');
        $user->updated_by = Auth::id();





        if($request->input("isChanegPassword", false)){
            $user->password = Hash::make($request->input("password",null));
        }
        $user->save();
        return response([
            'message' => 'successfully saved!', 'status' => true
        ]);
    }



    public function updateAvatar(Request $request){
        $status = false;
        if ($request->hasFile('avatharImg')) {
            $status = true;
            $avatharName = sprintf("%s.%s",time(), $request->file('avatharImg')->extension());
            $destinationPath = "assets/avatar";
            $request->file('avatharImg')->move($destinationPath, $avatharName);


            $img = Image::make($destinationPath.'/'.$avatharName)->resize(126, 139);
            $img->save($destinationPath.'/'.$avatharName, 60);
            $user = \App\Models\User::find(Auth::id());
            $user->avatar = $avatharName;
            $user->save();
            return response([
                'message' => 'successfully updated!', 'status' => $status
            ]);
        }else{
            return response([
                'message' => 'sorry file not uploaded!', 'status' => $status
            ], 421);
        }

    }



    public function toggleStatus(Request $request){
        $user = \App\Models\User::find($request->input("id", 0));
        if($user){
            $user->status =  !$user->status;
            $user->save();
        }

        return response([
            'message' => 'successfully changed status', 'status' => 1
        ]);
    }

    public function delete(Request $request){
        $user = App\Models\User::find($request->input("id", 0));
        if($user){
            $user->delete();
        }
        return response([
            'message' => 'successfully deleted', 'status' => 1
        ]);
    }

    public function socialLogin(Request $request){
        $idToken = $request->input("idToken", null);
        $auth = app('firebase.auth');
        //$signInResult = $auth->getUser($uid);;
        try {
            $verifiedIdToken = $auth->verifyIdToken($idToken);
        } catch (InvalidToken $e) {
            echo 'The token is invalid: '.$e->getMessage();
        } catch (\InvalidArgumentException $e) {
            echo 'The token could not be parsed: '.$idToken.'=='.$e->getMessage();
        }
        $uid = $verifiedIdToken->claims()->get('sub');
        $authUser = $auth->getUser($uid);

        $http = new \GuzzleHttp\Client;


        $res = $http->post(url("v1/oauth/token"), [
            'form_params' => [
                'grant_type' => 'password',
                'client_id' => '2',
                'client_secret' => 'K6IlhS1oZBgxNQciIEtCoXzlHRGu0MefIkNkp68b',
                'username' => $authUser->email,
                'password' => $authUser->uid,
                'scope' => '',
            ],
        ]);

        $statusCode = $res->getStatusCode(); // 200
        if($statusCode == 200){
            return $res->getBody();
        }else{
            return response(["success" => false, "message"=> "user not found"], 401);
        }

    }
}
