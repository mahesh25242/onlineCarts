@extends('email.layouts.app')
@section('content')
    <p>Hello  {{ $shop->name }},</p>
    <p>Your mobile <b>{{ $shop->phone }}</b> is not verified. Customer can't order your product through
        <a href="{{ $shop->shop_url }}">{{ $shop->shop_url }}</a>.
    </p>
    <p>
        To verify your mobile, Please login to your shop admin panel by using this link: <a href="{{ $shop->shop_url }}/admin">{{ $shop->shop_url }}/admin</a>
        and then click on <b>Shop Settings</b> from main menu. Then click on <b>Click here to verify your mobile</b> link in that page. then you will get a OTP to your mobile and enter that OTP in the popup field.
    </p>
@endsection

