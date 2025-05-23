# Generated by Django 5.2 on 2025-05-01 07:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0002_featuredexhibition_upcomingexhibition_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Artwork',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255)),
                ('artist', models.CharField(max_length=255)),
                ('image', models.ImageField(upload_to='artworks/')),
                ('section', models.CharField(choices=[('featured', 'Featured'), ('trending', 'Trending'), ('upcoming', 'Upcoming')], max_length=20)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('is_minted', models.BooleanField(default=False)),
                ('blockchain', models.CharField(blank=True, choices=[('ethereum', 'Ethereum'), ('polygon', 'Polygon'), ('solana', 'Solana'), ('tezos', 'Tezos')], max_length=50, null=True)),
                ('token_id', models.CharField(blank=True, max_length=255, null=True)),
                ('contract_address', models.CharField(blank=True, max_length=255, null=True)),
                ('wallet_address', models.CharField(blank=True, max_length=255, null=True)),
                ('tx_hash', models.CharField(blank=True, max_length=255, null=True)),
            ],
        ),
        migrations.DeleteModel(
            name='Exhibition',
        ),
    ]
