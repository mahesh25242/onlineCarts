<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Validator;


class SettingController extends Controller
{


    public function settings(Request $request){
        $settings = \App\Models\Setting::get();
        return response($settings);
    }


    public function save(Request $request, $id = 0){
        $validator = Validator::make($request->all(), [
            'id' => ['required'],
            'value' => ['required', 'string']
        ]);


        if($validator->fails()){
            return response(['message' => 'Validation errors', 'errors' =>  $validator->errors(), 'status' => false], 422);
        }

        $setting = \App\Models\Setting::find($id);
        $setting->value = $request->input("value", '');
        $setting->save();
        return response(['message' => 'Successfully saved', 'status' => true]);
    }

    public function footerData(){
        $settings = \App\Models\Setting::whereIn("name", ["site_name", "email", "mobile", "address"])->get();
        $returnarr = [];
        foreach($settings as $setting){
            $returnarr[$setting->name] = $setting->value;
        }
        return response($returnarr);
    }
}
