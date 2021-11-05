<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Validator;

class WhatsupAddPhoneController extends Controller
{


    public function save(Request $request){

        $validator = Validator::make($request->all(), [
            'phone' => 'required',
        ]);

        if($validator->fails()){
            return response(['message' => 'Validation errors', 'errors' =>  $validator->errors(), 'status' => false], 422);
        }

        $whatsupAddPhoneController = new \App\Models\WhatsupAddPhone;
        $whatsupAddPhoneController->phone = $request->input("phone", '');
        $whatsupAddPhoneController->prefill_message_id = $request->input("pm_id", '');
        $whatsupAddPhoneController->save();

        return response(['message' => 'Phone added', 'status' => true], 200);
    }




}
