import React, { useEffect, useState } from 'react';

function AddArticles() {
  const [Article, setArticle] = useState({
    title: '',
    content: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  useEffect(() => {
    const fetchUserRole = async () => {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        setUserRole('unauthorized');
        setIsLoadingUser(false);
        return;
      }

      try {
        const res = await fetch('http://127.0.0.1:8000/api/users/me/', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (res.ok) {
          const data = await res.json();
          setUserRole(data.role); // assumes backend returns { role: "admin" | "counselor" | "youth" }
        } else {
          setUserRole('unauthorized');
        }
      } catch (err) {
        setUserRole('unauthorized');
      } finally {
        setIsLoadingUser(false);
      }
    };

    fetchUserRole();
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setArticle((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch(`http://127.0.0.1:8000/api/articles/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(Article),
      });

      if (response.ok) {
        setArticle({ title: '', content: '' });
        setSubmitStatus('successful');
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setTimeout(() => setSubmitStatus(null), 2000);
      setIsSubmitting(false);
    }
  };

  if (isLoadingUser) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  if (userRole !== 'admin') {
    return <p className="text-center mt-10 text-red-500">Access denied. Admins only.</p>;
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className=" sm:absolute shadow-sm mt-5 sm:top-5 sm:right-0 sm:w-[55%] mx-auto"
      >
        <h1 className="text-center mb-5">Add Article</h1>
        <h2 className="text-center mb-5">Welcome Admin!</h2>

        <div className="flex flex-col justify-between">
          <div className="flex flex-col shadow-md mx-2">
            <p className="mt-5 p-2">Title</p>
            <input
              type="text"
              name="title"
              value={Article.title}
              onChange={handleChange}
              className="w-full h-10 border rounded focus:outline-none p-2"
              placeholder="add title here"
              required
            />
          </div>
          <div className="flex flex-col shadow-md mx-2">
            <p className="mt-5 p-2">Content</p>
            <textarea
              name="content"
              value={Article.content}
              onChange={handleChange}
              placeholder="add content here"
              className="w-full h-50 border rounded focus:outline-none p-2"
              required
            />
          </div>
        </div>

        <div className="mx-auto w-[30%] text-center text-white my-3 p-1 sm:my-5 sm:py-3 cursor-pointer border bg-black rounded-full sm:w-[20%]">
          <button
            className="cursor-pointer"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Adding...' : 'Add Now'}
          </button>
        </div>

        {submitStatus && (
          <p className="text-center text-sm">
            {submitStatus === 'successful'
              ? 'Article added successfully!'
              : 'Something went wrong!'}
          </p>
        )}
      </form>
    </div>
  );
}

export default AddArticles;
