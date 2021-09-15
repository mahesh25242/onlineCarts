<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SettingController extends Controller
{


    public function settings(Request $request){
        $settings = \App\Models\Setting::get();
        return response($settings);
    }




}
