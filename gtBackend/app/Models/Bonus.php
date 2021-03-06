<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bonus extends Model
{
    public $timestamps = false;
    use HasFactory;

    protected $fillable = [
        'bogof',
        'designer_frames',
        'coatings',
        'cx_number',
        'bonus_date',
        'user_id'
    ];

    /**
     * Get the user that owns the Bonus
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

}
