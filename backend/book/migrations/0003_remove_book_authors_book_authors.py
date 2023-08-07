# Generated by Django 4.2.4 on 2023-08-05 06:52

from django.db import migrations, models
import django.db.models.deletion



class Migration(migrations.Migration):

    dependencies = [
        ('author', '0003_author_address'),
        ('book', '0002_rename_title_tag_name_alter_book_categories'),
    ]

    operations = [
        migrations.RenameField(
            model_name='book',
            old_name='authors',
            new_name='authors_old',
        ),
        migrations.AddField(
            model_name='book',
            name='authors',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, to='author.author'),
        ),
        migrations.RemoveField(
            model_name='book',
            name='authors_old',
        ),
    ]
