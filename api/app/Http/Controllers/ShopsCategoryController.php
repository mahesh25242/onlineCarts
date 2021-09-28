<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Validator;
class ShopsCategoryController extends Controller
{
    public function categories(Request $request){
        $categories = \App\Models\ShopCategory::get();
        return response($categories);
    }

    public function store(Request $request){

        $validationField = [
            'name' => ['required'],
            'status' => ['required'],
        ];



        $validator = Validator::make($request->all(), $validationField);


        if($validator->fails()){
            return response(['message' => 'Validation errors', 'errors' =>  $validator->errors(), 'status' => false], 422);
        }
        $input = $request->all();
        if($request->input("id", 0)){
            $shopCategory = \App\Models\ShopCategory::where('id', $request->input("id", 0))->update($input);
            $shopCategory = \App\Models\ShopCategory::find($shopCategory);
        }else{
            $shopCategory = \App\Models\ShopCategory::create($input);
        }

        if ($request->hasFile('image')) {
            $destinationPath = "assets/categories/";
            $extension = $request->file('image')->extension();
            $fileName = sprintf("%s.%s", uniqid('img_'),$extension);

            $request->file('image')->move($destinationPath, $fileName);

            $shopCategory->image = $fileName;
            $shopCategory->save();
        }


        return response(['data' => $shopCategory, 'message' => 'Account created successfully!', 'status' => true]);
    }

    public function delete(Request $request, $id=0){
       $shopCategory =  \App\Models\ShopCategory::where('id', $id)->delete();
       return response(['message' => 'successfully deleted!', 'status' => true]);
    }

    public function activeCategories(Request $request){
        $categories = \App\Models\ShopCategory::withCount("shop")->get();
        return response($categories);
    }

}
