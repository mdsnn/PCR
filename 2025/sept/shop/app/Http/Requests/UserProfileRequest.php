<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UserProfileRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'username' => [
                'required',
                'string',
                'min:3',
                'max:30',
                'alpha_dash',
                Rule::unique('users', 'username')->ignore($this->user()->id),
                'not_regex:/^(admin|root|api|www|mail|ftp)$/i' // Reserved usernames
            ],
            'bio' => [
                'nullable',
                'string',
                'max:500',
                'not_regex:/[<>]/i' // Basic XSS protection
            ],
            'location' => [
                'nullable',
                'string',
                'max:255'
            ],
            'profile_picture' => [
                'nullable',
                'image',
                'mimes:jpeg,png,jpg,gif,webp',
                'max:2048', // 2MB max
                'dimensions:min_width=100,min_height=100,max_width=2000,max_height=2000'
            ],
        ];
    }

    /**
     * Get custom error messages for validator errors.
     */
    public function messages(): array
    {
        return [
            'username.unique' => 'This username is already taken. Please choose another.',
            'username.alpha_dash' => 'Username can only contain letters, numbers, dashes, and underscores.',
            'username.not_regex' => 'This username is not allowed.',
            'username.min' => 'Username must be at least 3 characters long.',
            'username.max' => 'Username cannot be longer than 30 characters.',
            'bio.not_regex' => 'Bio cannot contain HTML tags.',
            'profile_picture.dimensions' => 'Profile picture must be at least 100x100 pixels and no larger than 2000x2000 pixels.',
            'profile_picture.max' => 'Profile picture must not be larger than 2MB.',
        ];
    }
}