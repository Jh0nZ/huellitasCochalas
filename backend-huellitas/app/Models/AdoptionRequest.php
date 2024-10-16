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
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
