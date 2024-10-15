<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ImageResource\Pages;
use App\Models\Image;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Support\Facades\Storage;

class ImageResource extends Resource
{
    protected static ?string $model = Image::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\FileUpload::make('file') // Cambiamos a FileUpload
                    ->required()
                    ->label('Image')
                    ->disk('public') // El disco donde se guardará
                    ->directory('images') // Carpeta donde se guardarán las imágenes
                    ->preserveFilenames() // Preserva el nombre original del archivo
                    ->visibility('public'), // Establecer la visibilidad a pública
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('filename')
                    ->label('Filename'),
                Tables\Columns\TextColumn::make('path')
                    ->label('Path'),
                Tables\Columns\TextColumn::make('mime_type')
                    ->label('MIME Type'),
                Tables\Columns\TextColumn::make('size')
                    ->label('Size'),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListImages::route('/'),
            'create' => Pages\CreateImage::route('/create'),
            'edit' => Pages\EditImage::route('/{record}/edit'),
        ];
    }

    protected static function afterCreate(Image $record, $data): void
    {
        // Guardar la imagen en el modelo
        $record->update([
            'filename' => $data['file']->getClientOriginalName(),
            'path' => Storage::disk('public')->putFile('images', $data['file']),
            'mime_type' => $data['file']->getClientMimeType(),
            'size' => $data['file']->getSize(),
        ]);
    }
}
