<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Validator;

class PrefillMessageController extends Controller
{


    public function messages(Request $request){
        $messages = new \App\Models\PrefillMessage;
        if($request->input("is_default", 0)){
            $messages = $messages->where("is_default", 0);
        }
        return response($messages->get());
    }


    public function save(Request $request, $id = 0){
        $validator = Validator::make($request->all(), [
            'name' => ['required', 'string'],
            'subject' => ['required', 'string'],
            'message' => ['required'],
            //'is_default' => ['required']
        ]);


        if($validator->fails()){
            return response(['message' => 'Validation errors', 'errors' =>  $validator->errors(), 'status' => false], 422);
        }

        if($id){
            $message = \App\Models\PrefillMessage::find($id);
        }else{
            $message = new \App\Models\PrefillMessage;
        }

        if(!$request->input("is_default", 0))
            $message->name = $request->input("name", '');
        $message->subject = $request->input("subject", '');
        $message->message = $request->input("message", '');
        $message->is_default = $request->input("is_default", 0);
        $message->save();
        return response(['message' => 'Successfully saved', 'status' => true]);
    }


    public function deleteMsg(Request $request){
        $message = \App\Models\PrefillMessage::find($request->input("id", 0));
        $message->delete();
        return response(['message' => 'Successfully deleted', 'status' => true]);
    }


}
