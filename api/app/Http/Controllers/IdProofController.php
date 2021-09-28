<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class IdProofController extends Controller
{


    public function types(Request $request){




        $types = [
            [
                "name" => 'Driving License',
            ],
            [
                "name" => 'Passport',
            ],
            [
                "name" => 'Voter ID',
            ],
            [
                "name" => 'PAN Card',
            ],
            [
                "name" => 'Shop Registeration',
            ],
            [
                "name" => 'Aadhaar',
            ],
            [
                "name" => 'Any Other valid id proof',
            ],
        ];


        return response($types);
    }

    public function checkExists(Request $request){

        $shopKey = $request->header('shopKey');

        $shopKey = ($shopKey) ? $shopKey : $request->input("shop_key");
        $shop = \App\Models\Shop::where("shop_key", $shopKey)->get()->first();



        $userIdProof = \App\Models\UserIdProof::where("user_id", Auth::id())
        ->latest()
        ->get()->first();
        return response($userIdProof);

    }


    public function upload(Request $request){
        $shopKey = $request->header('shopKey');

        $shopKey = ($shopKey) ? $shopKey : $request->input("shop_key");
        $shop = \App\Models\Shop::where("shop_key", $shopKey)->get()->first();

        if(!$shop){
            return response(['message' => 'No shop found!', 'status' => false], 404);
        }

        if ($request->hasFile('idProof')) {
            $destinationPath = "assets/shop/{$shop->shop_key}/general";
            $extension = $request->file('idProof')->extension();
            $fileName = sprintf("%s.%s", uniqid('idproof_'),$extension);

            $request->file('idProof')->move($destinationPath, $fileName);

            if($request->input("id", 0)){
                $userIdProof = \App\Models\UserIdProof::find($request->input("id", 0));
                if($userIdProof->status){
                    return response(['message' => 'approved id proof was available', 'status' => false], 422);
                }
            }else{
                $userIdProof = new \App\Models\UserIdProof;
            }


            $userIdProof->user_id = Auth::id();
            $userIdProof->name = $request->input("idProofType", '');
            $userIdProof->file_name = $fileName;
            $userIdProof->status = 0;
            $userIdProof->save();
        }
        return response(['message' => 'successfully uploaded', 'status' => true]);
    }

    public function userIdProofs(Request $request){
        $perPage = 50;
        $userIdProofs = \App\Models\UserIdProof::with(["userRole.shop"])->latest()
        ->paginate($perPage);
        return response($userIdProofs);
    }


    public function changeStatus(Request $request){
        $userIdProofs = \App\Models\UserIdProof::find($request->input("id", 0));

        if(!$userIdProofs->status){
            $userIdProofs->userRole->shop->status = 1;
            $userIdProofs->userRole->shop->save();

            $userIdProofs->status = 1;
            $userIdProofs->save();
        }else{
            $userIdProofs->status = 0;
            $userIdProofs->save();
        }

        return response(['message' => 'successfully changed status', 'status' => true]);
    }
}
