<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pet extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'age',
        'status',
        'breed_id',
        'user_id',
        'size_id',
        'sterilized',
        'description',
        'gender',
        'lat',
        'lng',
    ];

    public function breed()
    {
        return $this->belongsTo(Breed::class);
    }

    public function size()
    {
        return $this->belongsTo(Size::class);
    }

    public function images()
    {
        return $this->belongsToMany(Image::class, 'pet_images', 'pet_id', 'image_id')
                    ->withTimestamps();
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
