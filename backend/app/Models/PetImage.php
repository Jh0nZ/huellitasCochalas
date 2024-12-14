<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PetImage extends Model
{
    use HasFactory;

    protected $fillable = [
        'pet_id',
        'image_id',
    ];

    public function pet()
    {
        return $this->belongsTo(Pet::class);
    }

    public function image()
    {
        return $this->belongsTo(Image::class);
    }
}
