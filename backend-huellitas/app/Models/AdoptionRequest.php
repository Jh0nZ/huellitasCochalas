<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AdoptionRequest extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'status',
        'additional_notes',
        'phone',
        'location',
        'pet_id',
        'lat',
        'lng',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    
    public function pet()
    {
        return $this->belongsTo(Pet::class);
    }

    public function images()
    {
        return $this->belongsToMany(Image::class, 'adoption_request_images');
    }
}
