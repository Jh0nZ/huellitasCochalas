<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AdoptionRequestImage extends Model
{
    use HasFactory;

    protected $fillable = [
        'adoption_request_id',
        'image_id',
    ];

    public function adoptionRequest()
    {
        return $this->belongsTo(AdoptionRequest::class);
    }

    public function image()
    {
        return $this->belongsTo(Image::class);
    }
}
