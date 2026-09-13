# Zoo Project - Application de gestion de zoo

Application web full-stack de gestion d'un zoo : suivi des animaux,
de leurs espèces et races, gestion des vétérinaires, upload de photos
et publication d'annonces, avec authentification sécurisée.

## Fonctionnalités
- Authentification par JWT et gestion des utilisateurs
- Gestion des animaux, espèces et races (CRUD complet)
- Upload et gestion des images d'animaux
- Gestion des vétérinaires
- Module d'annonces
- API REST documentée automatiquement (Swagger via FastAPI)

## Stack technique
- **Back-end** : FastAPI (Python), SQLModel, MySQL, JWT (python-jose)
- **Front-end** : React 19, Redux Toolkit, React Router, Material UI, Tailwind CSS
- **Communication** : API REST (Axios), validation Formik + Yup

## Installation

### Back-end
​```bash
cd zoo_back
pip install -r requirements.txt
uvicorn main:app --reload
​```
API disponible sur http://localhost:8000 — documentation sur http://localhost:8000/docs

### Front-end
​```bash
cd zoo_front
npm install
npm run dev
​```
