from django.db import models

# Create your models here.
class todo(models.Model):
    title = models.CharField(max_length=200)
    status = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
    
class Meta:
    ordering = ('-created',)