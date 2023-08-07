# Generated by Django 4.2.4 on 2023-08-05 06:58

from django.db import migrations, models

def m2m_authors(apps, schema_editor):
    Book = apps.get_model("book","Book")

    for item in Book.objects.all():
        item.authors.add(item.authors_old)
        item.save()

def fk_authors(apps, schema_editor):
    Book = apps.get_model("book","Book")

    for item in Book.objects.all():
        item.authors_old = item.authors.first()
        item.save()




class Migration(migrations.Migration):

    dependencies = [
        ('author', '0003_author_address'),
        ('book', '0003_remove_book_authors_book_authors'),
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
            field=models.ManyToManyField(to='author.author'),
        ),
        
        migrations.RunPython(m2m_authors, fk_authors),

        migrations.RemoveField(
            model_name='book',
            name='authors_old',
        ),
    ]