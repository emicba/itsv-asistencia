from django.contrib import admin
from .models import Course, Student, Attendance, Parent, Allergy, Diet

admin.site.register(Course)
admin.site.register(Student)
admin.site.register(Attendance)
admin.site.register(Parent)
admin.site.register(Allergy)
admin.site.register(Diet)
