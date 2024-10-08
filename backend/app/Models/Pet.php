<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pet extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'status',
        'sterilized',
        'location',
        'breed_id',
        'size_id',
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
        return $this->hasMany(PetImage::class);
    }
}
